"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormLabel,
  FormDescription,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Title Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="mt-3 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          <p className="text-sm mt-1">{initialData.title}</p>
        </>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Type your course name here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 ">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>

              <Button onClick={toggleEdit} type="button" variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
