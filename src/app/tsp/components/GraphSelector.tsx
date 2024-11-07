import GenerateRandomGraph from './graph-selector/GenerateRandomGraph';
import FileSelector from './graph-selector/FileSelector';
import MatrixInput from './graph-selector/MatrixInput';



export default function GraphSelector() {
  

  return (
<div className="flex flex-col mt-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow">
      <div >
        <FileSelector />
      </div>
      <div>
        <GenerateRandomGraph />
      </div>
    </div>
    <div className="mt-5 mb-5"> {/* Espacio entre los componentes */}
        <MatrixInput />
    </div>
</div>

  );
}
