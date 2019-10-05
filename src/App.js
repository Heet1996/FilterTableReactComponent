import React,{Component} from 'react';
import './App.css';

let products = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
  {category: 'Sporting Goods', price: '$199.99', stocked: true, name: 'Hockey'}
];
let productsCategory={};
products.forEach(product=>{
        let category=product.category;
        delete product.category;
        if(!productsCategory[category]) productsCategory[category]=[];
        productsCategory[category].push(product);
});

let Aux=(props)=>props.children;
let ProductCategoryRow=(props)=>{
    
  return(
    <tr key={props.product} className="productCategory">{props.product}</tr>
    );
}
let ProductRow=(props)=>{
 
  return (productsCategory[props.product]
            .map(
              (
                {price,stocked,name})=>
                 (
                  <tr key={price+Math.random().toFixed(3)}>
                    <td className={stocked?'red':null}>{name}</td>
                    <td>{price}</td>
                  </tr>
                  )
                
              )
  )
}
class ProductFilterTable extends Component
{
  render()
  {
    return (
      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(productsCategory)
                 .map((product,index)=> (<Aux key={index}><ProductCategoryRow product={product} /><ProductRow product={product}/></Aux>)) 
          }
          
        </tbody>
      </table>
    )
  }
}
class SearchBar extends Component
{
  handleChange=(event)=>{
    this.props.onChange(event.target.value);
  }
  handleCheckBox=(event)=>{
        this.props.onChecked();
  }
  render()
  {
    return(
      <div className="serach-container">
      <input type="text" onChange={this.handleChange} />
      <input type="checkbox" id="stockStatus" value={this.props.input} onChange={this.handleCheckBox}/>
      <label htmlFor="stockStatus">Only show products in stocks</label>
      </div>
    )
  }
}
class FilterDataTable extends Component
{
  state={
    input:'',
    checked:false
  }
  onHandleChange=(input)=>{
    this.setState((prevState)=>{return {...prevState,input:input}});
  }
  onChecked=()=>{
    this.setState((prevState)=>{return {checked:!prevState.checked}})
  }
  render()
    {
     return( <div className="container">
          <SearchBar 
           onChange={this.onHandleChange}
           input={this.state.input} 
           onChecked={this.onChecked} 
          />
          <ProductFilterTable
          />

      </div>)
    }
}
class App extends Component
{
  
  render()
  {
    return <FilterDataTable />
  }
}

export default App;
