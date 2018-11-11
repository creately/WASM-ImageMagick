import { blobToString, buildInputFile, Call, extractInfo } from '../src';

describe('call', () => {

  it('should print image metadata as json if output file is .json', async done => {
    const img = await buildInputFile('fn.png', 'srcFile.png')
    const inputFiles = [img]
    const command = ["convert", "srcFile.png", "info.json"]
    let processedFiles = await Call(inputFiles, command);
    expect(processedFiles[0].name).toBe('info.json')
    const data = JSON.parse(await blobToString(processedFiles[0].blob))
    expect(data[0].image.baseName).toBe('srcFile.png')
    done()
  })

  it('should be able to resize image', async done => {
    const img = await buildInputFile('fn.png')
    let info = await extractInfo(img)
    expect(info[0].image.geometry.height).toBe(145)
    let processedFiles = await Call(
      [img],
      ["convert", "fn.png", "-rotate", "90", "-resize", "200%", 'output.png']
    )
    expect(processedFiles[0].name).toBe('output.png')
    info = await extractInfo(processedFiles[0])
    expect(info[0].image.geometry.height).toBe(218)
    done()
  })

  xit('Call rotate and resize should output an image that is equals to the real output', async done => {
    done()
  })

  //TODO: test that all formats work as input and output
})
