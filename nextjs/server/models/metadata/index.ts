/**
 * Class representing Metadata.
 * @class Metadata
 */
class Metadata {
  #createdAt: Date;
  #updatedAt: Date;

  /**
   * Creates an instance of Metadata.
   * @memberof Metadata
   */
  constructor() {
    const currentTime = new Date();
    this.#createdAt = currentTime;
    this.#updatedAt = currentTime;
  }

  /**
   * Get a plain Javascript object.
   * @readonly
   * @type {{
   *     createdAt: Date;
   *     updatedAt: Date;
   *   }}
   * @memberof Metadata
   */
  get object(): {
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}

export default Metadata;
