import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    window.location.search = newParams.toString();
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
    {[...Array(totalPages)].map((_, index) => {
      const pageNum = index + 1;
      return (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          style={{
            width: '50px', 
            height: '50px',
            border: '2px solid black', 
            borderRadius: '4px', 
            backgroundColor: currentPage === pageNum ? '#72da6f' : 'white',
            color: currentPage === pageNum ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {pageNum}
        </button>
      );
    })}
  </div>


  );
};

export default Pagination;
