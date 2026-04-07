import BookDetail from "../components/Book/BookDetails"
import ButtonBack from "../components/ButtonBack/ButtonBack";

export default function BookDetailsPage() {
    return(
        <div className="pageContent">
            <div className="pageBookColumn">
                <ButtonBack />
                <BookDetail />
            </div>
        </div>
    )
}