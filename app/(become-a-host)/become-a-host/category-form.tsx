"use client";

import { categoryData, ICategoryData } from "@/app/data/category-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";
import { createCategory } from "@/app/actions/create-listing";

export const CategoryForm = ({ userId }: { userId: string }) => {
  const createCategoryWithId = createCategory.bind(null, userId);

  const [dataLogged, setDataLogged] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { progress, setProgress } = useProgress();

  const handleSelectCategory = (item: ICategoryData) => {
    if (item) {
      setSelectedCategory(item.name);
      setDataLogged(true);
    } else {
      setSelectedCategory("");
      setDataLogged(false);
    }
  };

  useEffect(() => {
    setProgress(14);
  }, [setProgress]);

  return (
    <form action={createCategoryWithId}>
      <input type="hidden" name="category" value={selectedCategory} />

      <div className="mx-auto mb-28 grid max-w-2xl grid-cols-2 gap-4 pl-5 pr-5 md:grid-cols-3">
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
                  handleSelectCategory(item);
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

      <ActionBar
        dataLogged={dataLogged}
        prevHref="/host"
        firstStep={true}
        currentStep={progress}
      />
    </form>
  );
};
