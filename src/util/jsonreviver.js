export default function(config){
        return function(key,value){
            this;
            if(key.endsWith("$fn")){
                return new Function(...value)
            }
            
            return undefined;

        }
}
let replacer=function(config){

}