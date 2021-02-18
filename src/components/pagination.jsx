
const Pagination = ({countItems,pageSize,currentPage,onPageChange}) => {
    const pages = [];
    const countPage = countItems / pageSize; 
    if (currentPage < 1 || countPage <= 1) return null;
    for (let i = 1; i < (countPage + 1); i++) pages.push(i);
    return (
        
        <ul className="pagination">
            {pages.map((page) => (
                <li className={"page-item" + (currentPage === page && " active")}
                    key = {page}>
                <a href="#1" className="page-link" onClick={() => onPageChange(page)}>{page}</a>
            </li>
            ))}
        </ul>
    )
}
export default Pagination;