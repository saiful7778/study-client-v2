import { Link, createFileRoute } from "@tanstack/react-router";
import { FC, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Form from "@/components/ui/form";
import { toast } from "@/hooks/useToast";
import { signUpSchema } from "@/lib/schemas/signUpSchema";
import Card from "@/components/ui/card";
import Password from "@/components/Password";
import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useNavigatePage from "@/hooks/useNavigatePage";
import errorStatus from "@/lib/errorStatus";
import { useAxios } from "@/hooks/useAxios";

const SingUp: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const navigate = useNavigatePage();
  const axios = useAxios();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setLoading((prop) => !prop);
      const { user } = await signUp(data.email, data.password);

      await updateProfile(user, {
        displayName: data.firstName + " " + data?.lastName,
      });

      await axios.post("/user", {
        userName: data.firstName + " " + data?.lastName,
        userEmail: data.email,
        userToken: user.uid,
      });

      toast({
        title: `Sign up successfully!`,
        description: `'${data.email}' account is created.`,
      });
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        errorStatus(err);
      }
    } finally {
      setLoading((prop) => !prop);
      form.reset();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <Card.header className="text-center ">
        <Card.title className="text-3xl text-primary">Sign Up</Card.title>
        <Card.description>Manage Your Studies Efficiently</Card.description>
      </Card.header>
      <Card.content>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
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
                      disabled={loading}
                    />
                  </Form.control>
                  <Form.message />
                </Form.item>
              )}
            />
            <Form.field
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.item>
                  <Form.label>Password</Form.label>
                  <Form.control>
                    <Password
                      placeholder="Password"
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
              name="confirmPassword"
              render={({ field }) => (
                <Form.item>
                  <Form.label>Confirm password</Form.label>
                  <Form.control>
                    <Password
                      placeholder="Confirm password"
                      {...field}
                      disabled={loading}
                    />
                  </Form.control>
                  <Form.message />
                </Form.item>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      </Card.content>
      <Card.footer className="justify-center">
        <p className="text-sm">
          Do you have an account?{" "}
          <Link className="link" to="/sign-in">
            Sign in
          </Link>
        </p>
      </Card.footer>
    </Card>
  );
};

export const Route = createFileRoute("/_auth/sign-up")({
  component: SingUp,
});
