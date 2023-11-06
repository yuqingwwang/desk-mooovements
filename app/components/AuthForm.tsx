import { TextField, Heading, Button } from "@radix-ui/themes";
import React from "react";

const AuthForm: React.FC<{ params: string }> = (props) => {
  return (
    <div className="max-w-xl">
      <Heading as="h1" className="py-3">
        {props.params}
      </Heading>
      <form className="space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="Username" />
        </TextField.Root>

        <TextField.Root>
          <TextField.Input placeholder="Password" />
        </TextField.Root>

        <Button>Create</Button>
      </form>
    </div>
  );
};

export default AuthForm;
