import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signInSchema } from "@/lib/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignIn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof signInSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      disabled={loading}
                    />
                  </Form.control>
                  <Form.message />
                </Form.item>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Sign In"}
            </Button>
          </form>
        </Form>
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
