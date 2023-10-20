import CategoryTable from "./CategoryTable";

export default (categories)=>{
return(
    <CategoryTable
        head={['#','Categoria', 'Ações']}
        body={categories.categories}
    />
)}
