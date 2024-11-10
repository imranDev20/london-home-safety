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
    borough: string;
    city: string;
    country: string;
  }) => void;
  defaultValue?: string;
}

interface Prediction {
  postcode: string;
  postcode_inward: string;
  postcode_outward: string;
  post_town: string;
  dependant_locality: string;
  thoroughfare: string;
  building_number: string;
  building_name: string;
  sub_building_name: string;
  po_box: string;
  department_name: string;
  organisation_name: string;
  udprn: number;
  umprn: string;
  postcode_type: string;
  su_organisation_indicator: string;
  delivery_point_suffix: string;
  line_1: string;
  line_2: string;
  line_3: string;
  premise: string;
  country: string;
  county: string;
  district: string;
  ward: string;
  longitude: number;
  latitude: number;
}

const boroughData = [
  { borough: 'Barking & Dagenham' },
  { borough: 'Barnet' },
  { borough: 'Bexley' },
  { borough: 'Brent' },
  { borough: 'Bromley' },
  { borough: 'Camden' },
  { borough: 'City of London' },
  { borough: 'Croydon' },
  { borough: 'Ealing' },
  { borough: 'Enfield' },
  { borough: 'Greenwich' },
  { borough: 'Hackney' },
  { borough: 'Hammersmith & Fulham' },
  { borough: 'Haringey' },
  { borough: 'Harrow' },
  { borough: 'Havering' },
  { borough: 'Hillingdon' },
  { borough: 'Hounslow' },
  { borough: 'Islington' },
  { borough: 'Kensington & Chelsea' },
  { borough: 'Kingston Upon Thames' },
  { borough: 'Lambeth' },
  { borough: 'Lewisham' },
  { borough: 'Merton' },
  { borough: 'Newham' },
  { borough: 'Redbridge' },
  { borough: 'Richmond Upon Thames' },
  { borough: 'Southwark' },
  { borough: 'Sutton' },
  { borough: 'Tower Hamlets' },
  { borough: 'Waltham Forest' },
  { borough: 'Wandsworth' },
  { borough: 'City of Westminster' }
];

export const AddressValidationAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  defaultValue = '',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [borough, setBorough] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const IDEAL_POSTCODES_API_KEY = process.env.NEXT_PUBLIC_IDEAL_POSTCODES_API_KEY;

  const fetchPredictions = async (input: string) => {
    if (!input || input.length < 2) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.ideal-postcodes.co.uk/v1/postcodes/${input}?api_key=${IDEAL_POSTCODES_API_KEY}`
      );

      if (!response.ok) throw new Error('Failed to fetch predictions');

      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        setPredictions(data.result);
      }
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

  const formatAddress = (prediction: Prediction) => {
    const parts = [];
    if (prediction.line_1) parts.push(prediction.line_1);
    if (prediction.line_2) parts.push(prediction.line_2);
    if (prediction.post_town) parts.push(prediction.post_town);
    if (prediction.postcode) parts.push(prediction.postcode);
    return parts.join(', ');
  };

  const handleSelect = (prediction: Prediction) => {
    setValue(prediction.postcode);
    setBorough(getBoroughFromPrediction(prediction) || '');
    setCity(prediction.post_town || '');
    setCountry(prediction.country || 'United Kingdom');

    onAddressSelect({
      postcode: prediction.postcode,
      borough: getBoroughFromPrediction(prediction) || '',
      city: prediction.post_town || '',
      country: prediction.country || 'United Kingdom',
    });
    setOpen(false);
  };

  const getBoroughFromPrediction = (prediction: Prediction): string | null => {
    const matchedBorough = boroughData.find(item => prediction.district?.toLowerCase() === item.borough.toLowerCase());
    return matchedBorough?.borough || null;
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
          <PopoverContent className="w-[710px] p-0">
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
                      value={formatAddress(prediction)}
                      onSelect={() => handleSelect(prediction)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === prediction.postcode ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {formatAddress(prediction)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Borough</label>
        {borough ? (
          <Input 
            placeholder="Borough"
            value={borough}
            readOnly
            className="bg-gray-50"
          />
        ) : (
          <p className="text-gray-500">No borough found</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <Input 
          placeholder="City"
          value={city}
          readOnly
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Country</label>
        <Input 
          placeholder="Country"
          value={country}
          readOnly
          className="bg-gray-50"
        />
      </div>
    </div>
  );
};

export default AddressValidationAutocomplete;