import ButtonCard from "../../Components/ButtonCard"
import { useForm } from "@inertiajs/react";

export default ({...props})=>{
    const { head, body } = props;
    const { get, delete:destroy } = useForm();

    const handleButtonEdit = (e)=>{
        get(`/categories/${e}/edit`)
    };
    const handleButtonDel = (e)=>{
        destroy(`/categories/${e}`)
    };

    return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                {
                    head.map((item, index)=>
                        <th scope="col" className="px-6 py-2" key={index}>{item}</th>
                    )
                }
            </tr>
          </thead>
          <tbody>
                {
                    body.map((item, index)=>{
                        return (
                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-2 font-medium">{item.id}</td>
                            <td className="whitespace-nowrap px-6 py-2">{item.category}</td>
                            <td className="whitespace-nowrap px-6 py-2">
                            {
                                <>
                                <ButtonCard
                                    id="edit"
                                    type="button"
                                    onClick={()=> handleButtonEdit(item.id) }
                                    className="bg-lime-600 mr-2"
                                >
                                    Editar
                                </ButtonCard>
                                <ButtonCard
                                    id="del"
                                    className="bg-red-600"
                                    type="button"
                                    onClick={()=> handleButtonDel(item.id)}
                                >
                                    Deletar
                                </ButtonCard>
                                </>
                            }
                            </td>
                        </tr>
                        )
                    })
                }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
)
}
