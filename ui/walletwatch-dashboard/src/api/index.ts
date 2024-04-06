import { ERROR_MESSAGES } from "@/lib/messages";
import {
  BudgetApiRequest,
  BudgetApiResponse,
  IncomeApiRequest,
  IncomeApiResponse,
  LoginApiRequest,
  RegisterApiRequest,
  TransactionApiRequest,
  TransactionApiResponse,
  UserApiResponse,
} from "./api.types";
import { toast } from "@/components/ui/use-toast";
import axios, { AxiosResponse } from "axios";

const MOCK_PASSWORD = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWxhamlzdWt1bWFyYW4iLCJpYXQiOjE3MTExNTk0OTcsImV4cCI6MTcxMTE2MzA5NywiZmlyc3ROYW1lIjoiQmFsYWppIiwibGFzdE5hbWUiOiJTdWt1bWFyYW4ifQ.lB00d4yZuNe9-hmb4ynI925tKnXpfxEM4oHxNKDS_rs`;
const MOCK_BUDGETS: BudgetApiResponse[] = [
  {
    id: 1000,
    isPercentage: 0,
    value: 5.0,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "Entertainment 1st week",
    description: "movies, food, netflix",
    categoryId: {
      categoryId: 1,
      name: "Entertainment",
    },
  },
  {
    id: 1003,
    isPercentage: 0,
    value: 5.0,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "Entertainment 1st week",
    description: "movies, food, netflix",
    categoryId: {
      categoryId: 1,
      name: "Entertainment",
    },
  },
  {
    id: 1002,
    isPercentage: 0,
    value: 5.0,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "Entertainment 1st week",
    description: "movies, food, netflix",
    categoryId: {
      categoryId: 1,
      name: "Entertainment",
    },
  },
];
const MOCK_INCOMES: IncomeApiResponse[] = [
  {
    id: 1000,
    value: 8000.0,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "salary",
    description: "9 to 5 job",
  },
  {
    id: 1001,
    value: 8000.0,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "salary",
    description: "9 to 5 job",
  },
  {
    id: 1002,
    value: 8000.0,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "salary",
    description: "9 to 5 job",
  },
];
const MOCK_TRANSACTIONS: TransactionApiResponse[] = [
  {
    transactionId: 2001,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "Popcorn",
    description: "food",
    categoryId: {
      categoryId: 1,
      name: "Entertainment",
    },
    reminder: {
      reminderTypeId: 2,
      type: "Weekly",
    },
    enableReminder: 0,
    paymentDate: 1711223794865,
    price: 5.0,
    url: "",
  },
  {
    transactionId: 2002,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "Popcorn",
    description: "food",
    categoryId: {
      categoryId: 1,
      name: "Entertainment",
    },
    reminder: {
      reminderTypeId: 2,
      type: "Weekly",
    },
    enableReminder: 0,
    paymentDate: 1711223794865,
    price: 5.0,
    url: "",
  },
  {
    transactionId: 2003,
    user: {
      userId: 1003,
      firstName: "Balaji",
      lastName: "Sukumaran",
      phone: "1234567890",
      email: "balajicr007@gmail.com",
      userName: "balajisukumaran",
      password: "$2a$10$ilIOsdhNiH5ph5z975pJyOy9DE0SwsXVfk5NGGnpTM1qgOcL0m7AW",
      resetToken: "",
    },
    name: "Popcorn",
    description: "food",
    categoryId: {
      categoryId: 1,
      name: "Entertainment",
    },
    reminder: {
      reminderTypeId: 2,
      type: "Weekly",
    },
    enableReminder: 0,
    paymentDate: 1711223794865,
    price: 5.0,
    url: "",
  },
];

// Update the Base URL without a '/' at the end.
export const BASE_URL = "http://container1:6001/api";

// API URLs with the `${BASE_URL}/` suffix
export const API_URLS = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  IMAGE_UPLOAD: `${BASE_URL}/image/upload`,
  IMAGE_DOWNLOAD: `${BASE_URL}/image/download`,
  GET_BUDGETS: `${BASE_URL}/budget/get`,
  ADD_BUDGET: `${BASE_URL}/budget/add`,
  DELETE_BUDGET: `${BASE_URL}/budget/delete`,
  GET_INCOMES: `${BASE_URL}/income/get`,
  ADD_INCOME: `${BASE_URL}/income/add`,
  DELETE_INCOME: `${BASE_URL}/income/delete`,
  GET_TRANSACTIONS: `${BASE_URL}/transaction/get`,
  ADD_TRANSACTION: `${BASE_URL}/transaction/add`,
  EDIT_TRANSACTION: `${BASE_URL}/transaction/edit`,
  DELETE_TRANSACTION: `${BASE_URL}/transaction/delete`,
  UPLOAD_TRANSACTION: `${BASE_URL}/transaction/upload`,
};

export const loginApi = async (request: LoginApiRequest) => {
  try {
    if (request.userName) localStorage.setItem("userName", request.userName);
    const response: AxiosResponse<UserApiResponse> = await axios.post(
      API_URLS.LOGIN,
      request
    );
    if (response.status === 200 && response.data?.password)
      return response.data?.password;
    throw new Error(ERROR_MESSAGES.LOGIN_FAILURE);
  } catch (err) {
    console.error(err);
    localStorage.removeItem("userName");
    toast({ description: ERROR_MESSAGES.LOGIN_FAILURE });
  }
  //  finally {
  //   //! Remove this after API Integration
  //   return MOCK_PASSWORD;

  //   // return;
  // }
};

export const registerApi = async (request: RegisterApiRequest) => {
  try {
    if (request.userName) localStorage.setItem("userName", request.userName);
    const response: AxiosResponse<UserApiResponse> = await axios.post(
      API_URLS.REGISTER,
      request
    );
    if (response.status === 200 && response.data?.password)
      return response.data?.password;
    throw new Error(ERROR_MESSAGES.REGISTER_FAILURE);
  } catch (err) {
    console.error(err);
    localStorage.removeItem("userName");
    toast({ description: ERROR_MESSAGES.REGISTER_FAILURE });
  }
  // finally {
  //   //! Remove this after API Integration
  //   return MOCK_PASSWORD;

  //   // return;
  // }
};

export const getBudgetsApi = async (): Promise<BudgetApiResponse[]> => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");
    const response: AxiosResponse<BudgetApiResponse[]> = await axios.get(
      API_URLS.GET_BUDGETS
    );
    if (response.status === 200) return response.data;
    throw new Error(ERROR_MESSAGES.BUDGET_GET_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.BUDGET_GET_FAILURE });
    return MOCK_BUDGETS;
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_BUDGETS;
  // }
};

export const addBudgetApi = async (request: BudgetApiRequest) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<BudgetApiResponse> = await axios.post(
      API_URLS.ADD_BUDGET,
      request
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.BUDGET_ADD });
    throw new Error(ERROR_MESSAGES.BUDGET_ADD_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.BUDGET_ADD_FAILURE });
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_BUDGETS[0];
  // }
};

export const deleteBudgetApi = async (request: BudgetApiResponse) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<BudgetApiResponse> = await axios.post(
      API_URLS.DELETE_BUDGET,
      request
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.BUDGET_DELETE });
    throw new Error(ERROR_MESSAGES.BUDGET_DELETE_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.BUDGET_DELETE_FAILURE });
    return MOCK_BUDGETS[0];
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_BUDGETS[0];
  // }
};

export const getIncomesApi = async (): Promise<IncomeApiResponse[]> => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<IncomeApiResponse[]> = await axios.get(
      API_URLS.GET_INCOMES
    );
    if (response.status === 200) return response.data;
    throw new Error(ERROR_MESSAGES.INCOME_GET_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.INCOME_GET_FAILURE });
    return MOCK_INCOMES;
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_INCOMES;
  // }
};

export const addIncomeApi = async (request: IncomeApiRequest) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<IncomeApiResponse> = await axios.post(
      API_URLS.ADD_INCOME,
      request
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.INCOME_ADD });
    throw new Error(ERROR_MESSAGES.INCOME_ADD_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.INCOME_ADD_FAILURE });
    return MOCK_INCOMES[0];
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_INCOMES[0];
  // }
};

export const deleteIncomeApi = async (request: IncomeApiResponse) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<IncomeApiResponse> = await axios.post(
      API_URLS.DELETE_INCOME,
      request
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.INCOME_DELETE });
    throw new Error(ERROR_MESSAGES.INCOME_DELETE_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.INCOME_DELETE_FAILURE });
    return MOCK_INCOMES[0];
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_INCOMES[0];
  // }
};

export const getTransactionsApi = async (): Promise<
  TransactionApiResponse[]
> => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<TransactionApiResponse[]> = await axios.get(
      API_URLS.GET_TRANSACTIONS
    );
    if (response.status === 200) return response.data;
    throw new Error(ERROR_MESSAGES.TRANSACTION_GET_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.TRANSACTION_GET_FAILURE });
    return MOCK_TRANSACTIONS;
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_TRANSACTIONS;
  // }
};

export const addTransactionApi = async (request: TransactionApiRequest) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<TransactionApiResponse> = await axios.post(
      API_URLS.ADD_TRANSACTION,
      request
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.TRANSACTION_ADD });
    throw new Error(ERROR_MESSAGES.TRANSACTION_ADD_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.TRANSACTION_ADD_FAILURE });
    return MOCK_TRANSACTIONS[0];
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_TRANSACTIONS[0];
  // }
};

export const editTransactionApi = async (request: TransactionApiRequest) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<TransactionApiResponse> = await axios.post(
      API_URLS.EDIT_TRANSACTION,
      request
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.TRANSACTION_EDIT });
    throw new Error(ERROR_MESSAGES.TRANSACTION_EDIT_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.TRANSACTION_EDIT_FAILURE });
    return MOCK_TRANSACTIONS[0];
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_TRANSACTIONS[0];
  // }
};

export const deleteTransactionApi = async (request: TransactionApiResponse) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<TransactionApiResponse> = await axios.post(
      API_URLS.DELETE_TRANSACTION,
      request
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.TRANSACTION_DELETE });
    throw new Error(ERROR_MESSAGES.TRANSACTION_DELETE_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.TRANSACTION_DELETE_FAILURE });
    return MOCK_TRANSACTIONS[0];
  }
  // finally {
  //   //! Remove finally block after API integration
  //   return MOCK_TRANSACTIONS[0];
  // }
};
export const uploadTransactionApi = async (formData: FormData) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("logged_token");

    const response: AxiosResponse<any> = await axios.post(
      API_URLS.UPLOAD_TRANSACTION,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200)
      toast({ description: ERROR_MESSAGES.TRANSACTION_UPLOAD });
    throw new Error(ERROR_MESSAGES.TRANSACTION_UPLOAD_FAILURE);
  } catch (err) {
    console.error(err);
    toast({ description: ERROR_MESSAGES.TRANSACTION_UPLOAD_FAILURE });
  }
};
