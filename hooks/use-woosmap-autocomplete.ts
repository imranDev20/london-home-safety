import { useState, useEffect, useCallback } from 'react';
import { WoosmapAddress, WoosmapPrediction } from '@/types/Woosmap-prediction';
import { useDebounce } from './use-debounce';

const WOOSMAP_PUBLIC_KEY = process.env.NEXT_PUBLIC_WOOSMAP_API_KEY;
console.log("WOOSMAP_PUBLIC_KEY", WOOSMAP_PUBLIC_KEY);

export const useWoosmapAutocomplete = () => {
  const [predictions, setPredictions] = useState<WoosmapPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!WOOSMAP_PUBLIC_KEY) {
      setError('Missing Woosmap API key.');
      console.error('Missing Woosmap API key.', error);
      return;
    } else {
      console.log("WOOSMAP_PUBLIC_KEY found");
    }

    const script = document.createElement('script');
    // script.src = `https://sdk.woosmap.com/localities/localities.js?key=${WOOSMAP_PUBLIC_KEY}`;
    script.src = `https://api.woosmap.com/localities/autocomplete/?input=london&key={WOOSMAP_PUBLIC_KEY}`;
    script.async = true;

    const loadWoosmapScript = async () => {
      try {
        await new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (window.woosmap?.localities?.Localities) {
              setIsScriptLoaded(true);
              console.log('Woosmap script loaded successfully.');
              resolve();
            } else {
              console.error('Woosmap Localities not found after script load.');
              reject(new Error('Woosmap Localities not found.'));
            }
          }, 500); 
          
          script.onerror = () => {
            console.error('Failed to load Woosmap script.');
            reject(new Error('Failed to load Woosmap script.'));
          };
          document.body.appendChild(script);
        });
      } catch (err) {
        setError('Failed to load Woosmap API.');
        console.error('Error during Woosmap script loading:', err);
      }
    };

    loadWoosmapScript().catch(err => {
      console.error('Error loading Woosmap script:', err);
      setError('Failed to load address suggestions service.');
    });

    return () => {
      if (script) document.body.removeChild(script);
    };
  }, []);

  const fetchPredictions = useCallback(
    useDebounce(async (input: string) => {
      if (!input || input.length < 2) {
        setPredictions([]);
        return;
      }
      console.log("Debounced fetchPredictions called with input:", input);

      if (!isScriptLoaded) {
        console.warn('Attempted to fetch predictions before script was loaded.');
        setError('Woosmap API script is not loaded.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const localities = new window.woosmap.localities.Localities();
        const response = await localities.getQueryPredictions({
          input,
          components: { country: ['gb'] },
          types: ['locality'],
          language: 'en',
        });
        console.log('Fetched predictions:', response);

        setPredictions(response.predictions || []);
      } catch (err) {
        setError('Failed to fetch city suggestions. Please try again later.');
        console.error('Woosmap API Error:', err);
      } finally {
        setLoading(false);
      }
    }, 300),
    [isScriptLoaded]
  );

  const getAddressDetails = async (placeId: string): Promise<WoosmapAddress> => {
    if (!isScriptLoaded) {
      throw new Error('Woosmap API script is not loaded.');
    }

    try {
      const localities = new window.woosmap.localities.Localities();
      console.log("localities instance created", localities);

      const details = await localities.getDetails({ id: placeId });
      console.log('City details response:', details);

      return {
        street: '',
        city: details.properties.city || '',
        postcode: details.properties.postal_code || '',
        country: 'United Kingdom',
      };
    } catch (err) {
      console.error('Error fetching city details:', err);
      throw new Error('Failed to fetch city details. Please try again later.');
    }
  };

  return {
    predictions,
    loading,
    error,
    fetchPredictions,
    getAddressDetails,
  };
};
