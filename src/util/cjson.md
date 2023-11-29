使用pack与unpack
###### usecase 
number->number
string->string|object
array->array
boolean->boolean
###### usecase nonT
{&ref:name->copy object}
{&let: 子树以下为let定义的变量}
{balabala:{&var:let|global|sibling|orwhat,value...}} 以balabala注册到上一级的scope中,或者？

###### usecase T
{&random:true/int/array}
{}