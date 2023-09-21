import CategoryTable from "./CategoryTable";

export default (categories)=>{
    console.log(categories.categories);
return(
    <CategoryTable
        head={['#','Categoria', 'Ações']}
        body={categories.categories}
    />
)}
