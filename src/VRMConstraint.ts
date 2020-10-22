import type * as THREE from 'three';

export abstract class VRMConstraint {
  public weight = 1.0;

  protected _object: THREE.Object3D;
  public get object(): THREE.Object3D {
    return this._object;
  }

  protected _source?: THREE.Object3D | null;

  public get dependencies(): Set<THREE.Object3D> {
    const deps = new Set<THREE.Object3D>();
    this._source && deps.add(this._source);
    return deps;
  }

  public constructor(object: THREE.Object3D) {
    this._object = object;
  }

  public setSource(source: THREE.Object3D | null): void {
    this._source = source;
  }

  /**
   * Get the object matrix of the source, taking desired object space into account.
   * Intended to be used to absorb between different spaces.
   * @param target Target matrix
   */
  protected _getSourceMatrix(target: THREE.Matrix4): THREE.Matrix4 {
    if (!this._source) {
      throw new Error('There is no source specified');
    }

    this._source.updateMatrixWorld();
    return target.copy(this._source.matrixWorld);
  }

  public abstract setInitState(): void;
  public abstract update(): void;
}
