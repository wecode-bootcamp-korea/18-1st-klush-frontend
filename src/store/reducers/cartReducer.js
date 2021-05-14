const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const DELETE = "DELETE";
const TOGGLE_ITEM = "TOGGLE_ITEM";
const HANDLECOUNT = "HANDLECOUNT";
const ADDCART = "ADDCART";
const HANDLE_CHECKBOX = "HANDLE_CHECKBOX";
const HANDLE_SELECT = "HANDLE_SELECT";
const SELECT_ALL = "SELECT_ALL";
const CHANGE_CHECK = "CHANGE_CHECK";

const INITIAL_STATE = {
  cartList: [
    // {
    //   id: 1,
    //   img:
    //     "https://images.unsplash.com/photo-1601215451470-87ebe1d9d57d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YmF0aCUyMGJvbWJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    //   name: "험프티 덤프티",
    //   category: "배쓰밤",
    //   quantity: 5,
    //   price: "10000",
    //   isChecked: true,
    // },
    // {
    //   id: 200,
    //   img:
    //     "https://images.unsplash.com/photo-1612217028533-de1e049eb6a9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGJhdGglMjBib21ifGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    //   name: "두번째 덤프티",
    //   category: "볼",
    //   quantity: 2,
    //   price: "13000",
    //   isChecked: true,
    // },
    // {
    //   id: 300,
    //   img:
    //     "https://images.unsplash.com/photo-1569383971623-393054ce65c8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8YmF0aCUyMGJvbWJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    //   name: "세번째 덤프티",
    //   category: "보디컨디셔너",
    //   quantity: 1,
    //   price: "9000",
    //   isChecked: true,
    // },
    // {
    //   id: 400,
    //   img:
    //     "https://images.unsplash.com/photo-1569383971623-393054ce65c8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8YmF0aCUyMGJvbWJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    //   name: "네번째 덤프티",
    //   category: "러쉬",
    //   quantity: 3,
    //   price: "2000",
    //   isChecked: true,
    // },
    // {
    //   id: 500,
    //   img:
    //     "https://images.unsplash.com/photo-1612217028533-de1e049eb6a9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGJhdGglMjBib21ifGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    //   name: "다섯번째 덤프티",
    //   category: "비누",
    //   quantity: 4,
    //   price: "30000",
    //   isChecked: true,
    // },
  ],
  isAllChecked: true,
};

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADDCART:
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };

    case INCREASE:
      return {
        ...state,
        cartList: state.cartList.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Number(item.quantity + 1) }
            : item
        ),
      };

    case DECREASE:
      return {
        ...state,
        cartList: state.cartList.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity <= 1 ? 1 : item.quantity - 1 }
            : item
        ),
      };
    case DELETE:
      const countItems = state.cartList
        .map(check => Number(check.isChecked))
        .reduce((acc, cur) => acc + cur);
      alert(`${countItems}개 상품이 장바구니에서 삭제 되었습니다.`);

      return {
        ...state,
        cartList: state.cartList.filter(item => !item.isChecked),
      };

    case TOGGLE_ITEM:
      return state.map(item =>
        item.id === action.id ? { ...item, ischecked: !item.ischecked } : item
      );
    case HANDLE_CHECKBOX:
      return (state.isAllChecked = state.cartList.every(
        check => check.isChecked
      )
        ? true
        : false);

    case HANDLE_SELECT:
      return {
        ...state,
        cartList: state.cartList.map(item =>
          item.id === action.payload.id
            ? { ...item, isChecked: !item.isChecked }
            : item
        ),
      };

    case CHANGE_CHECK:
      return { ...state, isAllChecked: action.payload };
    case SELECT_ALL:
      return {
        ...state,
        cartList: state.cartList.map(item => {
          item.isChecked = state.isAllChecked ? false : true;
          return item;
        }),
      };

    case HANDLECOUNT:
      return 1;

    default:
      return state;
  }
}
