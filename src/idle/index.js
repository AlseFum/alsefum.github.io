export class Material{
    label;
    recipe=[];
    static Random(mg){
        let ret=  new Material();
        ret.label=""
        for(let i =0;i<4;i++){ret.label+="0123456789ABCDEF"[Math.floor(Math.random()*16)]}

        let rate=0.8,cont=true;
        while (cont&&mg) {
            let topush=mg[Math.floor(Math.random()*mg.length)]
                if(typeof topush!='object'){
                    topush={label:topush,recipe:[]}
                }
            ret.recipe.push([topush.label,Math.ceil(rate*10*Math.random())])
            if((Math.random()>rate))cont=false;
            rate-=0.8*Math.random();
        }
        
        let m=new Map()
        for(let iter of ret.recipe){
           
            if(typeof m.get(iter[0]) ==='number'){
                m.set(iter[0],Math.min(m.get(iter[0]),iter[1]))
            }
            else m.set(iter[0],iter[1])
        }
         ret.recipe=Array.from(m);
        return ret;
    }
}
export class Idle{
    basicPoint=BigInt(0)
    blocks=[]
    materialAmount=new Map();
    materialList;
    constructor(){
        let mag=["basicPoint"]
        for(let iter=0;iter<3;iter++){
            mag.push(Material.Random(mag))
        }

        mag.forEach(i=>{
            this.materialAmount.set(i.label,0)
        })
        this.materialList=mag;
    }
    tick(){
        this.blocks.forEach(i=>{
            if(i.type===Block.produce){
                this.basicPoint+=BigInt(i.tickAmount)
            }else if(i.type===Block.functional){
                i.onTick(this);
            }
        })
    }
    click(){
        this.blocks.forEach(i=>{
            if(i.type===Block.produce){
                
            }else if(i.type===Block.functional){
                i.onClick(this);
            }
        })
    }
    newBlockPd(){
        this.basicPoint=this.basicPoint-BigInt(10);
        this.blocks.push(new BlockPd())
    }
}
export class Block{
    static produce=Symbol();
    static functional=Symbol();
}
export class BlockFn extends Block{
    type=Block.functional;
    onClick(){};
    onTick(inst){
        inst.basicPoint++;
    };
    slots=[];
    units=[];
    tags=[];
}
export class BlockPd extends Block{
    type=Block.produce
    materialType;
    tickAmount=1;
    slots=[];
    units=[];
    tags=[];
}
export class Slot{
    /**
     * 放Unit的？
     */
}
export class Unit{

}