'use client'

import { useState, useCallback } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import uploadImage from "@/helpers/uploadImageonImagebb"
import { useCreateCompanyMutation } from "@/lib/rtkqueryAPI/companies"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, X, Loader2 } from "lucide-react"

type Inputs = {
  title: string
  description: string
  image: FileList
}

interface CreateCompanyModalProps {
  refetch: () => void
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({ refetch }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [createCompany, { isLoading }] = useCreateCompanyMutation()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>()

  const watchImage = watch("image")

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsUploading(true)
    const { title, description } = data

    try {
      const imageUrl = await uploadImage(data.image, setImagePreview)
      if (!imageUrl) {
        throw new Error("Image upload failed")
      }

      await createCompany({
        company_title: title,
        description: description,
        image: imageUrl,
      }).unwrap()

      refetch()
      toast({
        title: `Company ${title} created successfully`,
        variant: "default",
      })
      reset()
      setIsOpen(false)
      setImagePreview(null)
    } catch (error) {
      toast({
        title: `Failed to create company`,
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Company</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Company Workspace</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                className="w-full"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                className="w-full"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  type="file"
                  {...register("image", { required: "Image is required" })}
                  
                  onChange={handleImageChange}
                 
                />
            
                {watchImage && watchImage[0] && (
                  <p className="text-sm text-gray-500 truncate max-w-[200px]">
                    {watchImage[0].name}
                  </p>
                )}
              </div>
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>

            {imagePreview && (
              <div className="relative w-full h-40">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => {
                setIsOpen(false)
                reset()
                setImagePreview(null)
              }}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading || isLoading}>
                {isUploading || isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Add Company'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCompanyModal