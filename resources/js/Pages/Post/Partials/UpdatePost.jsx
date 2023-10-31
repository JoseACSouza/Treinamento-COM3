import { useForm } from "@inertiajs/react";
import { useState } from "react";
import TextInput from "../../../Components/TextInput";
import ButtonCard from "../../../Components/ButtonCard";
import TextAreaInput from "../../../Components/TextAreaInput";
import InputLabel from "../../../Components/InputLabel";
import Checkbox from "../../../Components/Checkbox";

export default ({previous})=>{
    const { subject, content, owner, id,categories, allCategories, storage } = previous;
    const { data, setData, put, processing, errors, get, progress } = useForm({
        id: id,
        subject: subject,
        content: content,
        users_id: owner.id,
        'categories': categories,
        'storage':null,
      });

      const [checkedState, setCheckedState] = useState(
        data.categories && data.categories > 0 ? new Array(categories.length).fill(true):
        new Array(allCategories.length).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const selectedCategories = updatedCheckedState.map((item, index)=>{
            if (item) {
                return allCategories[index].id;
            }
        }).filter((item)=> item!== undefined);

        setData('categories', selectedCategories);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        await put(`/posts/${data.id}`);
        cancelar();
      }

      const cancelar = ()=>{
        get('posts');
      }

    return(
        <div className="bg-sky-500/20 rounded-lg p-3 m-3 h-76">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col item-start ">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0"
                    value={ owner.name }
                    disabled
                />
                <InputLabel className="flex flex-col my-2"> Título:
                    <TextInput
                    className="max-w-md bg-[#FFFFFF]/60 text-sm font-bold text-xl"
                    placeholder="Escreva um título para seu post"
                    onChange={e => setData('subject', e.target.value)}
                    value={ data.subject }
                    id="subject"
                />
                </InputLabel>
                {errors.subject && <div>{errors.subject}</div>}
                </div>
                <div className="flex flex-col my-2 block font-medium text-sm text-gray-700"> Categorias:
                <div className="flex">
                {allCategories.map((category, index)=>{
                    return(
                        <InputLabel key={index} htmlFor={`${category.id} update`} className="ml-2 flex justify-content">
                            <Checkbox
                                id={`${category.id} update`}
                                name={`${category.id} update`}
                                value={`${category.id} update`}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                                className="mr-1 mt-0.5"
                            />
                            {category.category}
                        </InputLabel>
                    )
                })}
                </div>
                {errors.categories && <div className="text-red-400 text-sm">{errors.categories}</div>}
                </div>
                <div className="flex flex-col">
                    <InputLabel className="flex flex-col"> Conteúdo do post:
                        <TextAreaInput
                            placeholder="Escreva algo legal"
                            onChange={e => setData('content', e.target.value)}
                            value={ data.content }
                            id="content"
                        />
                    </InputLabel>
                    {errors.content && <div className="text-red-400 text-sm">{errors.content}</div>}
                    <InputLabel className="flex flex-col"> Adicionar anexo:
                        <input type="file" filename={data.storage} onChange={e => setData('storage', e.target.files[0])} />
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </InputLabel>
                    <div className="flex flex-row self-end">

                        <ButtonCard
                            type="button"
                            className="bg-red-600 mr-2"
                            onClick={cancelar}
                        >
                            Cancelar
                        </ButtonCard>
                        <ButtonCard
                            type="submit"
                            className="bg-cyan-600 self-end"
                            disabled={processing}
                        >
                            Salvar
                        </ButtonCard>
                    </div>
                </div>
            </form>
        </div>
    );
}

