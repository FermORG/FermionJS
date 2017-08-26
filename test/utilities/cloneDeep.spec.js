import cloneDeep from '../../app/utilities/cloneDeep';

describe('cloneDeep', () => {
  it('should return primitives', () => {
    const number = 5;
    const string = 'aString';
    expect(cloneDeep(number)).toBe(5);
    expect(cloneDeep(string)).toBe('aString');
  });

  it('should return null and undefined', () => {
    expect(cloneDeep(null)).toBeNull;
    expect(cloneDeep(undefined)).toBeUndefined;
  });

  it('should clone an object', () => {
    const object = {key: 'value'};

    expect(cloneDeep(object) === object).toBe(false);
  });

  it('should deep clone arrays in objects', () => {
    const object = {key: [0,1,2,3]};
    expect(cloneDeep(object).key === object.key).toBe(false);
  });

  it('should deep clone objects in arrays', () => {
    const array = [
      {key: 'value'},
      {key: 'value'}
    ];

    expect(cloneDeep(array) === array).toBe(false);
    expect(cloneDeep(array)[0] === array[0]).toBe(false);
    expect(cloneDeep(array)[1] === array[1]).toBe(false);

  });

  it('should deep clone objects in objects', () => {
    const object = {
      key: {
        key: 'value',
      },
    };
    expect(cloneDeep(object) === object).toBe(false);
    expect(cloneDeep(object).key === object.key).toBe(false);
  });

  it ('should handle deeply nested data', () => {
    const object = {
      key: {
        key1: {
          key2: {
            key3: 'value',
          },
          array: [0,1,2,3],
        }
      },
      array: [
        {
          key4: 'value',
        },
        {
          key5: 'value',
        },
        1,
        {
          key6: {
            key7: {
              key8: {
                key9: {
                  key10: {
                    key11: {
                      key12: {
                        key13: {
                          key14: {
                            key15: {
                              key16: 'value',
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
          },
        },
      ],
    };
    expect(cloneDeep(object) === object).toBe(false);
    expect(cloneDeep(object).key === object.key).toBe(false);
    expect(cloneDeep(object).key.key1 === object.key.key1).toBe(false);
    expect(cloneDeep(object.key.key1.key2) === object.key.key1.key2).toBe(false);
    expect(cloneDeep(object.key.key1.array) === object.key.key1.array).toBe(false);
    expect(cloneDeep(object.array) === object.array).toBe(false);
    expect(cloneDeep(object).array[0] === object.array[0]).toBe(false);
    expect(cloneDeep(object).array[1] === object.array[1]).toBe(false);
    expect(cloneDeep(object).array[2] === object.array[2]).toBe(true);
    expect(cloneDeep(object).array[3] === object.array[3]).toBe(false);

    let clone = cloneDeep(object).array[3];
    let original = object.array[3];

    expect(clone.key6 === original.key6).toBe(false);
    expect(clone.key6.key7 === original.key6.key7).toBe(false);
    expect(clone.key6.key7.key8 === original.key6.key7.key8).toBe(false);
    expect(clone.key6.key7.key8.key9 === original.key6.key7.key8.key9).toBe(false);
    expect(clone.key6.key7.key8.key9 === original.key6.key7.key8.key9).toBe(false);

    clone = clone.key6.key7.key8.key9;
    original = original.key6.key7.key8.key9;

    expect(clone.key10 === original.key10).toBe(false);
    expect(clone.key10.key11 === original.key10.key11).toBe(false);
    expect(clone.key10.key11.key12 === original.key10.key11.key12).toBe(false);
    expect(clone.key10.key11.key12.key13 === original.key10.key11.key12.key13).toBe(false);
    expect(clone.key10.key11.key12.key13.key14 === original.key10.key11.key12.key13.key14).toBe(false);
    expect(clone.key10.key11.key12.key13.key14.key15 === original.key10.key11.key12.key13.key14.key15).toBe(false);
    expect(clone.key10.key11.key12.key13.key14.key15.key16 === original.key10.key11.key12.key13.key14.key15.key16).toBe(true);
  });
});
