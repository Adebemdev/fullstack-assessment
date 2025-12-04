export default function Home() {
  return (
    <div className="bg-red-500">
      <h1 className="text-2xl">Hello, A fullstack assessment</h1>
    </div>
  );
}

// Component Name,Type,Description
// Header,UI/Layout,"Contains the application title/logo and navigation links (e.g., ""Dashboard,"" ""Add Product"")."
// ProductTable,Data/List,The main data grid showing all products. It includes columns for essential product details.
// SearchFilterBar,Input,"A combined area above the table that includes the search input field and filter dropdowns (e.g., by category, price range)."
// ProductRow,Data/List,Represents a single row in the ProductTable. It may include Edit and View action buttons.
// ProductForm,Input/Form,"A reusable form for adding a new product or editing an existing one. Contains fields like name, description, price, and stock."
// DetailsCard,Display,A component to display the read-only details of a selected product (used on the details page).
