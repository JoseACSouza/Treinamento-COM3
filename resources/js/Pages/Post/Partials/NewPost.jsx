import { useForm } from "@inertiajs/react";
import { useState } from "react";
import TextInput from "../../../Components/TextInput";
import ButtonCard from "../../../Components/ButtonCard";
import TextAreaInput from "../../../Components/TextAreaInput";
import InputLabel from "../../../Components/InputLabel";
import Checkbox from "../../../Components/Checkbox";


export default ({auth, allCategories})=>{
    const { data, setData, post, errors, reset } = useForm({
        'id': '',
        'subject': '',
        'content': '',
        'users_id': auth.user.id,
        'categories':[],
    });

    const [checkedState, setCheckedState] = useState(
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post('post/new');
        reset();
      }

    return(
        <div className="bg-sky-500/20 rounded-lg p-3 m-3 h-76">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col item-start ">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0 p-0 "
                    value={ auth.user.name }
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
                {errors.subject && <div className="text-red-400 text-sm">{errors.subject}</div>}
                <div className="flex flex-col my-2 block font-medium text-sm text-gray-700"> Categorias:
                    <div className="flex">
                    {allCategories.map((category, index)=>{
                        return(
                            <InputLabel key={index} htmlFor={category.id} className="ml-2 flex justify-content">
                                <Checkbox
                                    id={category.id}
                                    name={category.id}
                                    value={category.id}
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
                    <ButtonCard
                        type="submit"
                        className="mr-2 w-20 bg-cyan-600 self-end"
                        > Postar
                    </ButtonCard>
                </div>
            </form>
        </div>
    );
}
