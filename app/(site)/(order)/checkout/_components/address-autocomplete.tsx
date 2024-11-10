import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    postcode: string;
    city: string;
    street: string;
    country: string;
  }) => void;
  defaultValue?: string;
}

interface Prediction {
  id: string;
  description: string;
  properties: {
    street_address?: string;
    city?: string;
    postal_code?: string;
    country_code?: string;
    name?: string;
    address?: string;
  };
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  defaultValue = '',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const WOOSMAP_PUBLIC_KEY = process.env.NEXT_PUBLIC_WOOSMAP_API_KEY;

  const fetchPredictions = async (input: string) => {
    if (!input || input.length < 2) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.woosmap.com/localities/autocomplete?` +
          new URLSearchParams({
            input: input,
            components: 'country:gb',
            key: WOOSMAP_PUBLIC_KEY || '',
            types: 'postal_code',
            language: 'en'
          })
      );

      if (!response.ok) throw new Error('Failed to fetch predictions');

      const data = await response.json();
      setPredictions(data.localities || []);
    } catch (err) {
      console.error('Error fetching predictions:', err);
      setError('Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) fetchPredictions(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const parseAddress = (description: string) => {
    const parts = description.split(', ');
    if (parts.length >= 3) {
      return {
        postcode: parts[0], // This will be the postcode
        city: parts[1],
        street: parts[2]
      };
    }
    return null;
  };
  
  const handleSelect = async (prediction: Prediction) => {
    const addressParts = parseAddress(prediction.description);
    const country = prediction.properties.country_code || ''; 
    
    if (addressParts) {
      setValue(addressParts.postcode);
      setCity(addressParts.city);
      setStreet(addressParts.street);
  
      onAddressSelect({
        postcode: addressParts.postcode,
        city: addressParts.city,
        street: addressParts.street,
        country,
      });
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Post Code</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || 'Search postcode...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput
                placeholder="Enter postcode..."
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                <CommandEmpty>
                  {loading ? 'Loading...' : error || 'No postcode found.'}
                </CommandEmpty>
                <CommandGroup>
                  {predictions.map((prediction, index) => (
                    <CommandItem
                      key={index}
                      value={prediction.description}
                      onSelect={() => handleSelect(prediction)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === prediction.description ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {prediction.description}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <Input 
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          readOnly
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Street</label>
        <Input 
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          readOnly
          className="bg-gray-50"
        />
      </div>
    </div>
  );
};

export default AddressAutocomplete;
