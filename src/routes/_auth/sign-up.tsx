import { Link, createFileRoute } from "@tanstack/react-router";
import { FC, useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Form from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/lib/schemas/signUpSchema";
import Card from "@/components/ui/card";

const SingUp: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [showPass, setShowPass] = useState<boolean>(false);

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

  const handleSubmit = (data: z.infer<typeof signUpSchema>) => {
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
    <>
      {/* <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button
          className="btn btn-sm btn-ghost btn-square text-primary"
          onClick={() => setShowPass((prop) => !prop)}
          type="button"
        >
          {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div> */}
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
              <Form.field
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <Form.item>
                    <Form.label>Confirm password</Form.label>
                    <Form.control>
                      <Input
                        placeholder="Confirm password"
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
                {loading ? <span className="spinner"></span> : "Sign Up"}
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
    </>
  );
};

export const Route = createFileRoute("/_auth/sign-up")({
  component: SingUp,
});
