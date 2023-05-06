import { createContext, useContext } from 'react';

export function createFacade(factory ) {
  const context = createContext(null);

  const Provider = (props) => {
    const { children, value } = props;
    const contextValue = factory(value);

    return <context.Provider value={contextValue}>{children} </context.Provider>;
  };

  return {
    Provider,
    useFacade: () => useContext(context),
  };
}
