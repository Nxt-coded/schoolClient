import { createSlice } from "@reduxjs/toolkit";

interface iProps {
  val: string;
  state: boolean;
  id: number;
}

let data = [
  // { val: "Nursery School", state: false, id: 1 },
  { val: "Nur/Primary School", state: true, id: 2 },
  { val: "Secondary School.", state: false, id: 3 },
  // { val: "Tertiary School.", state: false, id: 4 },
  // { val: "Kindergarten Schhol.", state: false, id: 5 },
];

const initialState = {
  test: [{ instruction: {} }, { question: [] }],
  testTry: { instruction: {}, question: [] },
  user: "" || null,
  getEmail: "" || null,
  userStatus: "" || null,
  payRef: "" || null,
  toggle: false,
  delayToggled: false,
  toggleMenu: false,
  showStaffComp: false,

  cartToggle: false,
  imageToggle: false,
  cart: [],
  otherPay: {} || null,
  monitorView: false,
  showStudent: false,
  sessionToggle: false,
  sessionToggled: false,
  sessionTermToggle: false,
  subjectToggled: false,
  classroomToggled: false,
  notice: false,
  starting: false,
  event: false,
  termID: "" || null,

  schoolInfo: {} || null,
  categoryData: data,
  categoryPicked: Array<iProps> || null,
};

const reduxState = createSlice({
  name: "schoolProject",
  initialState,
  reducers: {
    getEntryEmail: (state: any, { payload }) => {
      state.getEmail = payload;
    },
    loginState: (state: any, { payload }) => {
      state.user = payload;
    },

    getSchoolInfo: (state: any, { payload }) => {
      state.schoolInfo = payload;
    },

    logoutState: (state) => {
      state.user = null;
    },
    categoryState: (state) => {
      state.categoryData = data!;
    },

    pickedCategory: (state, { payload }) => {
      state.categoryPicked = payload;
    },

    changeCategoryState: (state, { payload }) => {
      let findData: any = state.categoryData.find((el: any) => {
        return el.id === payload.id;
      });
      if (findData && !findData.state) {
        state.categoryData.forEach((el: any) => {
          el.state = false;
        });
        findData.state = true;
      }
    },

    changeMenuState: (state, { payload }) => {
      state.toggle = payload;
    },

    changeToggleMenuState: (state, { payload }) => {
      state.toggleMenu = payload;
    },

    changeStarting: (state, { payload }) => {
      state.starting = payload;
    },

    displayStaffComp: (state, { payload }) => {
      state.showStaffComp = payload;
    },

    displayStudent: (state, { payload }) => {
      state.showStudent = payload;
    },

    displayDelay: (state, { payload }) => {
      state.delayToggled = payload;
    },

    displaySession: (state, { payload }) => {
      state.sessionToggle = payload;
    },

    displaySessionTerm: (state, { payload }) => {
      state.sessionTermToggle = payload;
    },

    displaySessioned: (state, { payload }) => {
      state.sessionToggled = payload;
    },

    displayCart: (state, { payload }) => {
      state.cartToggle = payload;
    },

    displaySubject: (state, { payload }) => {
      state.subjectToggled = payload;
    },

    displayClass: (state, { payload }) => {
      state.classroomToggled = payload;
    },

    displayNotice: (state, { payload }) => {
      state.notice = payload;
    },

    displayNoticeEvent: (state, { payload }) => {
      state.event = payload;
    },

    displayUserStatus: (state, { payload }) => {
      state.userStatus = payload;
    },

    displayImageToggle: (state, { payload }) => {
      state.imageToggle = payload;
    },

    addTestInstruction: (state, { payload }: any): any => {
      state.test[0].instruction = payload;
    },

    changeTermID: (state, { payload }: any): any => {
      state.termID = payload;
    },

    addTestQuestion: (state, { payload }: any) => {
      state.test[1].question?.push(payload);
    },

    updateTestQuestion: (state, { payload }) => {
      const { id, question, answer, options } = payload;
      const index = state.test[1].question.findIndex((q) => q.id === id);

      if (index !== -1) {
        state.test[1].question[index] = {
          ...state.test[1].question[index],
          question,
          answer,
          options,
        };
      }
    },

    addTestQuestionTry: (state, { payload }: any) => {
      const vale = { ...payload };
      state.testTry.question?.push(vale);
    },

    addToCart: (state, { payload }: any) => {
      const check = state.cart.findIndex((el) => el._id === payload._id);

      if (check > -1) {
        state.cart[check].QTY += 1;
      } else {
        const addValue = {
          ...payload,
          QTY: 1,
        };
        state.cart.push(addValue);
        state.cart;
      }
    },

    changeCartPick: (state, { payload }) => {
      const check = state.cart.findIndex((el) => el._id === payload._id);
      let checkValue = state.cart[check].QTY;

      if (state.cart[check].QTY > 1) {
        state.cart[check].QTY -= 1;
      } else if (checkValue === 1) {
        state.cart = state.cart.filter((fl) => fl._id !== payload._id);
      }
    },

    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((el) => el._id !== payload._id);
    },

    emptyCart: (state) => {
      state.cart = [];
    },

    displayEmptyTest: (state) => {
      state.test = [{ instruction: {} }, { question: [] }];

      // state.test[1].question = [];
      // state.test[0].instruction = {};
    },

    paymentRef: (state, { payload }) => {
      state.payRef = payload;
    },

    otherPayment: (state, { payload }) => {
      state.otherPay = payload;
    },

    viewMonitor: (state, { payload }) => {
      state.monitorView = payload;
    },
  },
});

export const {
  getEntryEmail,
  otherPayment,
  emptyCart,
  viewMonitor,
  changeStarting,
  paymentRef,
  addToCart,
  removeFromCart,
  changeCartPick,
  displayEmptyTest,
  updateTestQuestion,
  addTestInstruction,
  addTestQuestion,
  loginState,
  logoutState,
  pickedCategory,
  categoryState,
  changeCategoryState,
  getSchoolInfo,
  changeMenuState,
  changeToggleMenuState,
  displayStaffComp,
  displayDelay,
  displayStudent,
  displaySession,
  displaySessioned,
  displayCart,
  displaySubject,
  displayClass,
  displayNotice,
  displayNoticeEvent,
  displayUserStatus,
  displayImageToggle,
  displaySessionTerm,
  changeTermID,
} = reduxState.actions;

export default reduxState.reducer;
