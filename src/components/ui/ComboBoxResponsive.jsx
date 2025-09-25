import React, { useState } from "react";
import { useMediaQuery } from "../../Hooks/use-media-query";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Drawer, DrawerContent, DrawerTrigger } from "./drawer";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// Define categories
const categories = [
  { value: "meat", label: "Meat" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "dairy", label: "Dairy " },
  { value: "grains", label: "Grains" },
  { value: "bakery", label: "Bakery" },
  { value: "beverages", label: "Beverages" },
  { value: "snacks", label: "Snacks" },
  { value: "frozen_foods", label: "Frozen Foods" },
  { value: "spices_condiments", label: "Spices & Condiments" },
  { value: "organic", label: "Organic" },
  { value: "canned_goods", label: "Canned & Jarred Goods" },
  { value: "household_essentials", label: "Household Essentials" },
  { value: "personal_care", label: "Personal Care" },
  { value: "baby_products", label: "Baby Products" },
  { value: "health_wellness", label: "Health & Wellness" },
  { value: "farm_garden", label: "Farm & Garden" },
  { value: "seafood", label: "Seafood" },
  { value: "ready_meals", label: "Ready Meals" },
];

export default function ComboBoxResponsive({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedCategory, setSelectedCategory] = useState(value || null);


  const handleSelect = (category) => {
    setSelectedCategory(category);
    onChange?.(category); // Pass the selected category back to the parent
    setOpen(false);
  };

  const TriggerButton = (
    <Button
      variant="outline"
      className="w-full justify-start bg-[#f5f5dc] text-gray-900 hover:bg-[#e6e2b5] border border-gray-300"
    >
      {selectedCategory ? selectedCategory.label : "+ Set Category"}
    </Button>
  );

  if (isDesktop) {
    return (
     <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start bg-beige">
            {selectedCategory ? selectedCategory.label : "+ Set Category"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CategoryList handleSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start bg-beige">
          {selectedCategory ? selectedCategory.label : "+ Set Category"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CategoryList handleSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CategoryList({ handleSelect }) {
  return (
    <Command>
      <CommandInput placeholder="Filter categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              key={category.value}
              value={category.value}
              onSelect={() => handleSelect(category)}
            >
              {category.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
