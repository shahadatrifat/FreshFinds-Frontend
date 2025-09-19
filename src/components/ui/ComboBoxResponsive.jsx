"use client";
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

// Define your categories here
const categories = [
  { value: "meat", label: "Meat & Poultry" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "dairy_eggs", label: "Dairy & Eggs" },
  { value: "grains_rice", label: "Grains & Rice" },
  { value: "bakery", label: "Bakery" },
  { value: "beverages", label: "Beverages" },
  { value: "snacks_sweets", label: "Snacks & Sweets" },
  { value: "frozen_foods", label: "Frozen Foods" },
  { value: "spices_condiments", label: "Spices & Condiments" },
  { value: "organic_products", label: "Organic Products" },
  { value: "canned_goods", label: "Canned & Jarred Goods" },
  { value: "household_essentials", label: "Household Essentials" },
  { value: "personal_care", label: "Personal Care" },
  { value: "baby_products", label: "Baby Products" },
  { value: "health_wellness", label: "Health & Wellness" },
  { value: "pet_supplies", label: "Pet Supplies" },
  { value: "farm_garden", label: "Farm & Garden" },
  { value: "seafood", label: "Seafood" },
  { value: "ready_meals", label: "Ready Meals" },
];


export default function ComboBoxResponsive() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedCategory ? selectedCategory.label : "+ Set Category"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CategoryList
            setOpen={setOpen}
            setSelectedCategory={setSelectedCategory}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedCategory ? selectedCategory.label : "+ Set Category"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CategoryList
            setOpen={setOpen}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CategoryList({ setOpen, setSelectedCategory }) {
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
              onSelect={(value) => {
                setSelectedCategory(
                  categories.find((category) => category.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {category.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
