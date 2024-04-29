import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [productToShow, setProductToShow] = useState({}); // Product detail, show product
  const [cartProducts, setCartProducts] = useState([]); // Shoppint cart, Add product to cart

  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Shoppiny cart
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState(null);
  const [filterItems, setFilterItems] = useState(null);

  // Get product by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  // Get product by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(items, searchByTitle);
    }

    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }

    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }

    if (!searchType) {
      return items;
    }
  };

  //Cada vez que tenga un cambio
  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilterItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    if (searchByTitle && !searchByCategory)
      setFilterItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    if (searchByCategory && !searchByTitle)
    setFilterItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    if (!searchByCategory && !searchByTitle)
    setFilterItems(
        filterBy(null, items, searchByTitle, searchByCategory)
      );
  }, [items, searchByTitle, searchByCategory]);

  const contextData = {
    count,
    setCount,
    openProductDetail,
    closeProductDetail,
    isProductDetailOpen,
    productToShow,
    setProductToShow,
    cartProducts,
    setCartProducts,
    isCheckoutSideMenuOpen,
    setIsCheckoutSideMenuOpen,
    openCheckoutSideMenu,
    closeCheckoutSideMenu,
    order,
    setOrder,
    items,
    setItems,
    searchByTitle,
    setSearchByTitle,
    filterItems,
    searchByCategory,
    setSearchByCategory,
  };

  return (
    <ShoppingCartContext.Provider value={contextData}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
