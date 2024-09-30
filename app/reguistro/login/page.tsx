import { FormEvent } from "react";
import { Input } from "../../components/input";
export default function LoginFrom(params: type) {
  const [name, setname] = useState();
  const [password, setpassword] = useState();

  const formOnsumit = async (e: FormEvent) => {
    e.preventDefault;
  };

  return (
    <form onSubmit={formOnsumit}>
      <h1>login</h1>
      <Input label="nombre" />
      <Input label="password" type={password} />
    </form>
  );
}
