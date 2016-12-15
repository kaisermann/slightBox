export default {
  public: {
    clickHandler(item, instance) {
      return function(e){
        e.preventDefault();
        console.log('oba');
      }
    }
  }
};
