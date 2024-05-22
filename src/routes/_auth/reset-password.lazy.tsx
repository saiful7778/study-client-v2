import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/hooks/useToast";
import errorStatus from "@/lib/errorStatus";
import { resetSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPass: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { resetPass } = useAuth();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof resetSchema>,
  ): Promise<void> => {
    try {
      setLoading((prop) => !prop);
      await resetPass(data.email);
      toast({
        title: "Email was send",
      });
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
        <Card.title className="text-3xl text-primary">
          Reset password
        </Card.title>
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
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Send email"}
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

export const Route = createLazyFileRoute("/_auth/reset-password")({
  component: ResetPass,
});
