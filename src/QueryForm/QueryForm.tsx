import { CreateProducts, FreeApi } from "../api/FreeApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface IProduct {
  name: string;
  price: number;
}

export function QueryForm() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["items"], FetchItems);
  const [newData, setData] = useState([]);
  useEffect(() => {
      if (!isLoading) setData(data.slice(-7));
  }, [isLoading, data])
  const {
    register,
    handleSubmit,
    reset,
    // setValue,
    // formState: { errors },
  } = useForm<IProduct>();

  async function FetchItems() {
    return await FreeApi();
  }

  async function PostItems(data: IProduct) {
    await CreateProducts(data);
  }

  const createProduct = useMutation({
    mutationFn: PostItems,
    onSuccess() {
      console.log("УСПЕШНО");
      queryClient.invalidateQueries(["items"]);
      // queryClient.refetchQueries(['items']);
      // queryClient.resetQueries();
    },
    onError(error) {
      console.log(error);
    },
  });

  const submitOnInValid: SubmitErrorHandler<IProduct> = (data) => {
    console.log(data);
  };

  const submitOnValid: SubmitHandler<IProduct> = (data: IProduct) => {
    createProduct.mutate(data);
  };

  return (
    <div>
      {isLoading ? (
        <h2>Идёт загрузка...</h2>
      ) : (
        <table style={{ fontSize: 20 }}>
          <thead>
            <tr style={{ fontSize: 25, fontWeight: "bold" }}>
              <td style={{ paddingRight: "60px", paddingBottom: "15px" }}>
                Наименование
              </td>
              <td style={{ paddingBottom: "15px" }}>Цена</td>
            </tr>
          </thead>
          <tbody>
            {newData.map(
              (item: { name: string; price: number; id: number }) => (
                <tr key={item.id}>
                  <td style={{ paddingBottom: "8px" }}>{item.name}</td>
                  <td style={{ paddingBottom: "8px" }}>{item.price}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
      <form
        style={{ marginTop: 10 }}
        onSubmit={handleSubmit(submitOnValid, submitOnInValid)}
      >
        <input
          placeholder="Введите название"
          style={{ fontSize: 15 }}
          {...register("name", { required: "true" })}
        ></input>
        <input
          placeholder="Введите цену"
          style={{ fontSize: 15 }}
          {...register("price", { required: "true" })}
        ></input>
        <br />
        <button style={{ marginTop: "10px", fontSize: 16 }} type="submit">
          Отправить данные
        </button>
        <button
          style={{ marginLeft: "40px", marginTop: "10px", fontSize: 16 }}
          type="button"
          onClick={() => reset()}
        >
          Очистить форму
        </button>
      </form>
    </div>
  );
}
