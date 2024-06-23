import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../ui/Button";
import {toast} from "react-toastify";
import {cn} from "../../../utils/cn";

const schema = z.object({
  title: z.string().min(1, {message: "Fill this field"}),
  author: z.string().min(1, {message: "Fill this field"}),
  ISBN: z.string().min(1, {message: "Fill this field"}),
  genre: z.string().min(1, {message: "Fill this field"}),
  description: z.string().min(1, {message: "Fill this field"}),
  coverImage: z
    .any()
    .refine((file) => !!file[0], "Enter a cover image for the book")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file[0]?.type),
      "Please enter a valid image [.jpg, .jpeg and .png]."
    )
    .refine((file) => file[0]?.size <= 1024 * 1024 * 2, "Max image size is 2MB."),
  bookPdf: z
    .any()
    .refine((file) => !!file[0], "Enter the pdf of the book")
    .refine((file) => file[0]?.type === "application/pdf", "Please enter a valid pdf.")
    .refine((file) => file[0]?.size <= 1024 * 1024 * 10, "Max pdf size is 10MB."),
});

interface FormValues {
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  description: string;
  coverImage: File;
  bookPdf: File;
}

const AddBook = ({onBookAdded}: {onBookAdded: () => void}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      schema.parse(data);

      // const response = await fetch("http://localhost:4000/api/register", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      // });

      // Promise Simulation
      interface ResponseType {
        ok: boolean;
        message: string;
      }
      const callApi: (sucessMsg: string, failedMsg: string) => Promise<ResponseType> = async (
        sucessMsg,
        failedMsg
      ) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const randomNumber = Math.random();
            const ok = randomNumber < 0.7;

            const responseObject = {
              ok,
              message: ok ? sucessMsg : failedMsg,
            };
            resolve(responseObject);
          }, 2000);
        });
      };

      const response = await callApi("Book Added Sucessfully", "Couldn't Add The Book");

      if (response.ok) {
        toast.success("Book Added!");
        onBookAdded();
      } else {
        throw new Error("Failed to Add Book!");
      }
    } catch (error) {
      toast.error("Failed to Add Book! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5">
      <div className="text-center font-bold text-3xl">Add Book</div>
      <FormInputField
        label="Title"
        registerProps={register("title")}
        error={Boolean(errors?.title)}
        helperText={errors.title?.message ?? ""}
      />
      <FormInputField
        label="Author"
        registerProps={register("author")}
        error={Boolean(errors?.author)}
        helperText={errors.author?.message ?? ""}
      />
      <FormInputField
        label="ISBN"
        registerProps={register("ISBN")}
        error={Boolean(errors?.ISBN)}
        helperText={errors.ISBN?.message ?? ""}
      />
      <FormInputField
        label="Genre"
        registerProps={register("genre")}
        error={Boolean(errors?.genre)}
        helperText={errors.genre?.message ?? ""}
      />
      <FormInputField
        label="Description"
        registerProps={register("description")}
        error={Boolean(errors?.description)}
        helperText={errors.description?.message ?? ""}
      />
      <FormInputField
        label="Cover Image"
        type="file"
        registerProps={register("coverImage")}
        error={Boolean(errors?.coverImage)}
        helperText={errors.coverImage?.message ?? ""}
      />
      <FormInputField
        label="Pdf"
        type="file"
        registerProps={register("bookPdf")}
        error={Boolean(errors?.bookPdf)}
        helperText={errors.bookPdf?.message ?? ""}
      />
      <div className="mt-5">
        <Button
          label={loading ? "Loading..." : "Add Book"}
          type="submit"
          variant={loading ? "muted" : "standard"}
        />
      </div>
    </form>
  );
};

export default AddBook;

const FormInputField = ({
  label,
  type = "text",
  registerProps,
  error,
  helperText,
}: {
  registerProps: any;
  error: boolean;
  helperText: string;
  label: string;
  type?: "text" | "number" | "file";
}) => (
  <div className="mb-5">
    <label className={error ? "text-red-600" : "text-secondary-foreground"}>{label}</label>
    <input
      className={cn(
        "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 bg-secondary text-secondary-foreground transition-colors",
        error ? "border-red-600" : "border-secondary-foreground"
      )}
      type={type}
      {...registerProps}
    />
    {helperText && <p className="mt-1 text-red-600 text-sm">{helperText}</p>}
  </div>
);
