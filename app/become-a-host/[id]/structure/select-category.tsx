"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryData } from "../../../lib/category-data";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectCategoryProps {
  setDataLogged: (value: boolean) => void;
}

export const SelectCategory = ({ setDataLogged }: SelectCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="mx-auto mb-28 grid max-w-2xl grid-cols-2 gap-4 pl-5 pr-5 md:grid-cols-3">
      <input type="hidden" name="category" value={selectedCategory as string} />
      {categoryData.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Card
              className={cn(
                "rounded-lg hover:outline hover:outline-2",
                selectedCategory === item.name
                  ? "bg-stone-50 outline outline-2"
                  : "",
              )}
              onClick={() => {
                setSelectedCategory(item.name);
                setDataLogged(true);
              }}
            >
              <CardHeader className="felx mt-3 flex-col p-3 pl-4">
                <motion.div
                  animate={{
                    scale: selectedCategory === item.name ? [1, 0.75, 1] : 1,
                    translateX:
                      selectedCategory === item.name ? [0, -19, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    height={26}
                    width={26}
                  />
                </motion.div>
                <h3 className="font-semibold text-black">{item.title}</h3>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
