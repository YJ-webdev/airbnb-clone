// import { User } from "next-auth";
// import { UseFormReturn, FieldErrors, FieldValues } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/app/components/login-dialog/Input";

// interface FormFieldProps {
//   user: User;
//   description: string;
//   id: string;
//   label: string;
//   errors: FieldErrors<any>;
//   form: UseFormReturn<any>;
//   data?: string | undefined | null;
// }

// export const FormElement = <T extends FieldValues>({
//   description,
//   id,
//   label,
//   form,
//   errors,
//   data,
// }: FormFieldProps) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       <div className="my-5">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit((data) => console.log(data))}
//             className="space-y-8"
//           >
//             <FormField
//               control={form.control}
//               name={id}
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="-mb-2 flex items-center justify-between">
//                     <FormLabel className="text-md font-semibold">
//                       {label}
//                     </FormLabel>
//                     <button
//                       onClick={() => {
//                         setOpen(!open);
//                       }}
//                       type="button"
//                       className="text-underline text-[15px] font-bold underline"
//                     >
//                       {open ? "Close" : data ? "Edit" : "Add"}
//                     </button>
//                   </div>
//                   {!open && (
//                     <p className="text-md text-muted-foreground">
//                       {data ? `${data}` : `Add your ${label}`}
//                     </p>
//                   )}
//                   {open && (
//                     <div className="flex flex-col gap-5">
//                       <div>
//                         <FormDescription className="mb-4 mt-0">
//                           {description}
//                         </FormDescription>
//                         <FormControl>
//                           <Input
//                             id={id}
//                             label={label}
//                             errors={errors}
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </div>
//                       <div>
//                         <Button type="submit" className="rounded-lg px-5 py-6">
//                           Save
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </FormItem>
//               )}
//             />
//           </form>
//         </Form>
//       </div>
//       <Separator />
//     </div>
//   );
// };
