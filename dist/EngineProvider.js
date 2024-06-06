"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineProvider = exports.useEngine = void 0;
const react_1 = __importStar(require("react"));
const Engine_1 = require("./world/Engine");
const EngineContext = (0, react_1.createContext)(null);
const useEngine = () => {
    const context = (0, react_1.useContext)(EngineContext);
    if (!context) {
        throw new Error('useEngine must be used within an EngineProvider');
    }
    return context;
};
exports.useEngine = useEngine;
const EngineProvider = ({ children }) => {
    const engineRef = (0, react_1.useRef)(new Engine_1.Engine());
    (0, react_1.useEffect)(() => {
        return () => { var _a; return (_a = engineRef.current) === null || _a === void 0 ? void 0 : _a.stop(); };
    }, []);
    const createEntity = () => engineRef.current.entityManager.createEntity();
    const removeEntity = (entity) => engineRef.current.entityManager.removeEntity(entity);
    const getEntityByName = (name) => engineRef.current.entityManager.getEntityByName(name);
    const getEntityByUUID = (uuid) => engineRef.current.entityManager.getEntityByUUID(uuid);
    const execute = (callback) => {
        engineRef.current.start();
        engineRef.current.registerFrameCallback(callback);
    };
    return (react_1.default.createElement(EngineContext.Provider, { value: {
            engine: engineRef.current,
            createEntity,
            removeEntity,
            getEntityByName,
            getEntityByUUID,
            execute
        } }, children));
};
exports.EngineProvider = EngineProvider;
