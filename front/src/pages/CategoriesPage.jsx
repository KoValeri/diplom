import { useGetCategoriesQuery } from "../api/categoriesApi" 
import CategoryList from "./Home/CategoryList";
import Headline from "../components/Headline/Headline";
import ButtonBack from "../components/ButtonBack/ButtonBack";

export default function СategoriesPage() {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery()

    return(
        <div className="pageContent">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <ButtonBack />
                    <Headline text={'Категории книг'}/>
                </div>
                <CategoryList categories={categories} isLoading={isLoading} isError={isError} />
        </div>
    )
}