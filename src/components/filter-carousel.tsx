"use client";

import { Carousel } from "@/components/ui/carousel";

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect?: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}

export const FilterCarousel = ({
  value,
  isLoading,
  onSelect,
  data,
}: FilterCarouselProps) => {
  console.log(value, isLoading, onSelect, data);

  return (
    <div className="relative w-full">
      <Carousel></Carousel>
    </div>
  );
};
