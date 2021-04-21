import { useState } from  'react';
import { useQuery } from  'react-query';

//components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Item from './items/item'
//styles
import { Wrapper, StyledButton } from './App.styles'

//types

export type ItemType = {

  id: number;
  category: string;
  desc: string;
  image: string;
  price: number;
  title: string;
  amount: number;

}
//get items from the fake api provided online
const getItems = async (): Promise<ItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  //default cart states
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ItemType[])
  //fetchig each items
  const { data, isLoading, error } = useQuery<ItemType[]>(
    'products', 
    getItems
  );

  console.log(data);

  const getAllItems = (items: ItemType[]) => 
    items.reduce((aq: number, item) => aq + item.amount, 0)
  const addToCart = (selectedItem: ItemType) => null;
  const removeFromCart = () => null;

  if(isLoading) return <LinearProgress />;
  if (error) return <div>Error</div>;

  return(
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent = {getAllItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={4}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} addToCart={addToCart}/>
          </Grid>
        ))}

      </Grid>
    </Wrapper>

    );
 
};

export default App;
