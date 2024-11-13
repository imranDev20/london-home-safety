import React from 'react'

export default function QuantityControl() {
    const QuantityControl = ({
        quantity,
        minQuantity,
        onChange,
      }: {
        quantity: number;
        minQuantity: number;
        onChange: (value: number) => void;
      }) => {
        return (
          <span className="flex items-stretch h-8 gap-1" style={{ width: "120px" }}>
            <button
              onClick={() => onChange(quantity - 1)}
              disabled={quantity <= minQuantity}
              className="flex-1 flex items-center justify-center text-primary border border-primary rounded-md transition-colors duration-200 hover:bg-white disabled:opacity-50"
            >
              <span className="text-lg font-medium select-none">−</span>
            </button>
            <input
              type="number"
              min={minQuantity}
              value={quantity}
              onChange={(e) => onChange(parseInt(e.target.value) || minQuantity)}
              className="w-10 text-center bg-transparent rounded-md focus:outline-none text-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => onChange(quantity + 1)}
              className="flex-1 flex items-center justify-center text-primary border border-primary rounded-md transition-colors duration-200 hover:bg-white"
            >
              <span className="text-lg font-medium select-none">+</span>
            </button>
          </span>
        );
      };
}
