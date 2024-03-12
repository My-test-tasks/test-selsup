import { FC, SyntheticEvent, createContext, useContext, useState } from "react";
import "./App.css";

interface Param {
  id: number;
  name: string;
  type?: "string" | "number";
}

interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
}

type Id = Pick<Param, "id">;

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const initContext = {
  params,
  model,
};

const Context = createContext(initContext);

const TextParam: FC<Id> = ({ id }) => {
  const context = useContext(Context);

  const param = context.params.find((param) => param.id === id);
  const paramValue = context.model.paramValues.find(
    (param) => param.paramId === id
  );

  const [value, setValue] = useState(paramValue?.value ?? "");

  const handlerOnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (paramValue) {
      setValue(e.currentTarget.value);
      paramValue.value = e.currentTarget.value;
    }
  };

  return (
    <label>
      <span>{param?.name}</span>
      <input type="text" value={value} onChange={handlerOnChange} />
    </label>
  );
};

const Param: FC<Id> = ({ id }) => {
  const context = useContext(Context);

  const param = context.params.find((param) => param.id === id);

  // Можно рендерить разные компоненты, в зависимости от типа параметра
  if (param?.type === "number") {
    return null;
  }

  return <TextParam id={id} />;
};

const ParamEditor = () => {
  const context = useContext(Context);

  const model = context.model;

  const handlerOnClick = () => {
    console.table(model.paramValues);
  };

  return (
    <section>
      <h2>Редактор параметров</h2>
      <ul>
        {model.paramValues.map((paramValue) => (
          <li key={paramValue.paramId}>
            <Param id={paramValue.paramId} />
          </li>
        ))}
      </ul>
      <button onClick={handlerOnClick}>getModel to console</button>
    </section>
  );
};

const App = () => {
  return (
    <Context.Provider value={initContext}>
      <ParamEditor />
    </Context.Provider>
  );
};

export default App;
