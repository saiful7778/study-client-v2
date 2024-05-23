import ImageUpload from "@/components/ImageUpload";
import Spinner from "@/components/Spinner";
import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import useAuthInfo from "@/hooks/useAuthInfo";
import { useAxiosSecure } from "@/hooks/useAxios";
import { toast } from "@/hooks/useToast";
import { userSchema } from "@/lib/schemas/authSchema";
import imageUpload from "@/lib/utils/imageUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AxiosInstance } from "axios";
import { updateProfile } from "firebase/auth";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Profile: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const { user, userData, token } = useAuthInfo();
  const axios = useAxiosSecure();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.displayName?.split(" ")[0],
      lastName: user?.displayName?.split(" ")[1],
      email: user?.email ?? undefined,
      photo: user?.photoURL ?? undefined,
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof userSchema>,
  ): Promise<void> => {
    try {
      setLoading((prop) => !prop);
      if (data?.photo) {
        const photoUrl = await imageUpload(
          "profile",
          data?.photo?.name,
          data?.photo,
        );
        updateProfile(user!, {
          photoURL: photoUrl,
        });
        await updateUser(
          {
            _id: userData?._id,
            userName: `${data.firstName} ${data?.lastName}`,
            email: user?.email,
            photoUrl,
          },
          axios,
          token,
        );
      } else {
        await updateUser(
          {
            _id: userData?._id,
            userName: `${data.firstName} ${data?.lastName}`,
            email: user?.email,
          },
          axios,
          token,
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    } finally {
      setLoading((prop) => !prop);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Form.field
          control={form.control}
          name="photo"
          render={({ field }) => (
            <Form.item>
              <Form.control>
                <>
                  {field.value && !updateImage && (
                    <Avatar className="size-52">
                      <Avatar.image
                        src={field.value}
                        className="object-cover"
                      />
                    </Avatar>
                  )}
                  {updateImage && <ImageUpload onChange={field.onChange} />}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2"
                    type="button"
                    onClick={() => setUpdateImage((prop) => !prop)}
                  >
                    Change image
                  </Button>
                </>
              </Form.control>
              <Form.message />
            </Form.item>
          )}
        />
        <div className="flex gap-4">
          <Form.field
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <Form.item>
                <Form.label>First name</Form.label>
                <Form.control>
                  <Input
                    placeholder="First name"
                    type="text"
                    {...field}
                    disabled={loading}
                  />
                </Form.control>
                <Form.message />
              </Form.item>
            )}
          />
          <Form.field
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <Form.item>
                <Form.label>Last name</Form.label>
                <Form.control>
                  <Input
                    placeholder="Last name"
                    type="text"
                    {...field}
                    disabled={loading}
                  />
                </Form.control>
                <Form.message />
              </Form.item>
            )}
          />
        </div>
        <Form.field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.item>
              <Form.label>Email address</Form.label>
              <Form.control>
                <Input
                  placeholder="Email address"
                  type="email"
                  {...field}
                  disabled={true}
                />
              </Form.control>
              <Form.description>
                You can't update email address
              </Form.description>
              <Form.message />
            </Form.item>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Update profile"}
        </Button>
      </form>
    </Form>
  );
};

async function updateUser(
  userData: {
    _id: string | undefined;
    userName: string;
    email: string | undefined | null;
    photoUrl?: string | null;
  },
  axios: AxiosInstance,
  token: string | undefined,
) {
  const res = await axios.patch(
    `/user/${userData?._id}`,
    {
      userName: userData.userName,
      userPhoto: userData?.photoUrl || null,
    },
    {
      params: { email: userData?.email },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res?.data.success) {
    toast({
      title: "User data is updated!",
    });
  }
}

export const Route = createLazyFileRoute("/_dashboard/profile")({
  component: Profile,
});
