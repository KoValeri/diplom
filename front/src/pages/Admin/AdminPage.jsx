// import { useGetCategoriesQuery } from "../api/categoriesApi" 
// import CategoryList from "./Home/CategoryList";
import Headline from "../../components/Headline/Headline";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import Table from "./Table";

export default function AdminPage() {
//   const { data: categories = [], isLoading, isError } = useGetCategoriesQuery()

    return(
        <div className="pageContent">
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <ButtonBack />
                <Headline text={'Панель администратора'}/>
            </div>

            <Table />
        </div>
    )
}