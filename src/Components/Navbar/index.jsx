import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  //Sign Out
  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  //Account
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);

  //Has un account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(true);
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">erick.aguila@gmail.com</li>
          <li>
            <NavLink
              to="/my-order"
              className={({ isActive }) => {
                return isActive ? activeStyle : undefined;
              }}
            >
              My Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => {
                return isActive ? activeStyle : undefined;
              }}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => {
                return isActive ? activeStyle : undefined;
              }}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => {
                return isActive ? activeStyle : undefined;
              }}
              onClick={() => handleSignOut()}
            >
              Sign Out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
            onClick={() => handleSignOut()}
          >
            Sign in
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-ligh">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={`${isUserSignOut ? "/sign-in" : "/"}`}>Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => context.setSearchByCategory("clothes")}
            className={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furnitures"
            onClick={() => context.setSearchByCategory("furniture")}
            className={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            onClick={() => context.setSearchByCategory("toys")}
            className={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/othes"
            onClick={() => context.setSearchByCategory("others")}
            className={({ isActive }) => {
              return isActive ? activeStyle : undefined;
            }}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-black" />
          <div>{context.cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
