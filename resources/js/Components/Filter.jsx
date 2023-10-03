import { useForm } from "@inertiajs/react"
import ButtonCard from "./ButtonCard";

export default (props) => {
    const { data, setData, post, get } = useForm({
        'filterCategory': '',
        'filterOwner': '',
    });
    const { allCategories, owners } = props;
    function handleSubmit(e) {
        e.preventDefault();
        post('/post/filter');
    }
    return (<div className="ml-3">
        <form onSubmit={handleSubmit}>
            <label htmlFor="filterCategory" className="mr-3"> Categorias:
                <select
                    className="ml-3"
                    name="filterCategory"
                    id="filterCategory"
                    onChange={(e) => setData('filterCategory', e.target.value)}
                    value={data.filterCategory}
                >
                    {
                        allCategories.map((item, index) => <option key={index} value={item.id}>{item.category}</option>)
                    }
                    <option value=''>Todas</option>
                </select>
            </label>
            <label htmlFor="filterOwner" className="mr-3"> Autor:
                <select
                    className="ml-3"
                    name="filterOwner"
                    id="filterOwner"
                    onChange={(e) => setData('filterOwner', e.target.value)}
                    value={data.filterOwner}
                >
                    {
                        owners.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
                    }
                    <option value=''>Todos</option>
                </select>
            </label>
            <ButtonCard
                type="submit"
                className="bg-sky-600"
            >
                Aplicar Filtros
            </ButtonCard>
            <ButtonCard
                type="button"
                className="bg-red-600 ml-3"
                onClick={()=>get('/news')}
            >
                Limpar Filtros
            </ButtonCard>
        </form>
    </div>)
}
