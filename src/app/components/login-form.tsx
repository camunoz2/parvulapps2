import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido</CardTitle>
          <CardDescription>
            Inicia sesion con tu cuenta Microsoft o Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full flex gap-2">
                  <img src="svg_microsoft.svg" alt="logo" className="h-full" />
                  Microsoft
                </Button>
                <Button variant="outline" className="w-full flex gap-2">
                  <img src="svg_google.svg" alt="logo" className="h-full" />
                  Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  O continua con
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Iniciar Sesión
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Crear Cuenta
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Al hacer el en continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y nuestra{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
