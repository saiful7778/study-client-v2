import Password from "@/components/Password";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import { toast } from "@/hooks/useToast";
import useAuth from "@/hooks/useAuth";
import { signInSchema } from "@/lib/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import errorStatus from "@/lib/errorStatus";
import SocialAuth from "@/components/SocialAuth";
import { ToastAction } from "@/components/ui/toast";

const SignIn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn, singOut } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setLoading((prop) => !prop);
      const { user } = await signIn(data.email, data.password);

      if (!user?.emailVerified) {
        toast({
          title: "Please verify your account",
          description: "Click this button to send mail",
          action: <ToastAction altText="Send verify">Send verify</ToastAction>,
        });
        await singOut();
        return;
      }

      toast({
        title: `Sign in successfully!`,
      });
      navigate({ to: "/" });
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
        <Card.title className="text-3xl text-primary">Sign In</Card.title>
        <Card.description>
          Access Your Dashboard and Stay Organized
        </Card.description>
      </Card.header>
      <Card.content>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
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
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Sign In"}
            </Button>
          </form>
        </Form>
        <SocialAuth />
      </Card.content>
      <Card.footer className="justify-center">
        <p className="text-sm">
          Don't have any account?{" "}
          <Link className="link" to="/sign-up">
            Sign up
          </Link>
        </p>
      </Card.footer>
    </Card>
  );
};

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignIn,
});
