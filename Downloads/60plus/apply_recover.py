import json
import sys

log_file = r'C:\Users\sanje\.gemini\antigravity-ide\brain\95efea4f-7975-43ef-8ffd-c43bc4bf8358\.system_generated\logs\transcript.jsonl'
target_file = r'c:\Users\sanje\Downloads\60plus\src\pages\PremiumLanding.jsx'

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(log_file, encoding='utf-8') as f:
    for line in f:
        try:
            obj = json.loads(line)
            if obj.get('source') == 'MODEL' and 'tool_calls' in obj:
                for tc in obj['tool_calls']:
                    if tc['name'] in ['multi_replace_file_content', 'replace_file_content']:
                        args = tc.get('args', {})
                        target = args.get('TargetFile', '')
                        if 'PremiumLanding.jsx' in target:
                            chunks = args.get('ReplacementChunks', [])
                            if not chunks and 'ReplacementContent' in args:
                                chunks = [args]
                            
                            for chunk in chunks:
                                t_content = chunk['TargetContent']
                                r_content = chunk['ReplacementContent']
                                if t_content in content:
                                    content = content.replace(t_content, r_content)
                                else:
                                    print(f"Failed to find target content in step {obj.get('step_index')}")
        except Exception as e:
            pass

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Recovery applied successfully.")
